export default function isImage(path) {
  return (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(path);
}