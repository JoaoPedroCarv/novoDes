const chai = require('chai');
const expect = chai.expect;
const soma = require('../math');

describe('Função de Soma', () => {
    it('Deve somar dois numeros corretamente', () =>{
        const resultado = soma(2, 3);
        expect(resultado).to.equal(5)
    })

    it('Deve somar números negativos corretamente', () =>{
        const resultado = soma(-2, -3);
        expect(resultado).to.equal(-5)
    })

    it('Deve somar positivos e negativos corretamente', () => {
        const resultado = soma(2, -3);
        expect(resultado).to.equal(-1)
    })
})