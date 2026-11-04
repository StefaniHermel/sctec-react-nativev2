function cupomValido(codigo) {
  return codigo === "PROMO10";
}

function aplicarDesconto(valor, codigo) {
  if (cupomValido(codigo)) {
    return valor - (valor * 0.10);
  } else {
    return valor;
  }
}

// ===== Testes de cupomValido =====
console.log(cupomValido("PROMO10"));  // true
console.log(cupomValido("promo10"));  // false
console.log(cupomValido("SEMCUPOM")); // false

// ===== Testes de aplicarDesconto =====
console.log(aplicarDesconto(100, "PROMO10")); // 90
console.log(aplicarDesconto(100, "XYZ"));     // 100