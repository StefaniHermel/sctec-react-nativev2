import slugify from "slugify";

function criarSlug(titulo) {
  return slugify(titulo, { lower: true });
}

export { criarSlug };