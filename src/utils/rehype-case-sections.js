/**
 * Wrap each level-2 heading and its following content in a grid section for case studies.
 * Only runs when frontmatter appears to match a case study entry.
 */
export default function rehypeCaseSections() {
  return (tree, file) => {
    const frontmatter = file?.data?.astro?.frontmatter ?? {};
    const isCaseStudy = Boolean(frontmatter?.summary) && Array.isArray(frontmatter?.categories);
    if (!isCaseStudy || !Array.isArray(tree.children)) {
      return;
    }

    const newChildren = [];
    const children = tree.children;
    let index = 0;

    while (index < children.length) {
      const node = children[index];

      if (isElement(node) && node.tagName === 'h2') {
        const heading = node;
        index += 1;
        const bodyNodes = [];

        while (index < children.length) {
          const next = children[index];
          if (isElement(next) && next.tagName === 'h2') {
            break;
          }
          bodyNodes.push(next);
          index += 1;
        }

        const section = createSection(heading, bodyNodes);
        newChildren.push(section);
      } else {
        newChildren.push(node);
        index += 1;
      }
    }

    tree.children = newChildren;
  };
}

function createSection(heading, bodyNodes) {
  return {
    type: 'element',
    tagName: 'section',
    properties: {
      className: ['case-section'],
    },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['case-section__title'],
        },
        children: [heading],
      },
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['case-section__body'],
        },
        children: bodyNodes,
      },
    ],
  };
}

function isElement(node) {
  return node && typeof node === 'object' && node.type === 'element';
}
