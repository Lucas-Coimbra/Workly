module.exports = {
  info: (obj) => console.log("INFO", JSON.stringify(obj)),
  warn: (obj) => console.warn("WARN", JSON.stringify(obj)),
  error: (obj) => console.error("ERROR", JSON.stringify(obj)),
};
