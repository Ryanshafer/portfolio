import { createMarkdownProcessor } from '@astrojs/markdown-remark';

let processorPromise: ReturnType<typeof createMarkdownProcessor> | undefined;

const getProcessor = async () => {
  processorPromise ??= createMarkdownProcessor();
  return processorPromise;
};

export const renderMarkdown = async (content: string) => {
  const processor = await getProcessor();
  const { code } = await processor.render(content);
  return code;
};
