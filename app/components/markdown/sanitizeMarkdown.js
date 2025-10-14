// utils/sanitizeMarkdown.js
 const sanitizeMarkdown = (text) => {
  if (!text) return "";
  // remove empty image tags like ![](), ![]( ), ![alt]()
  return text.replace(/!\[.*?\]\(\s*\)/g, "");
};

export default sanitizeMarkdown;