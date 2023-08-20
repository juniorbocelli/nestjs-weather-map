export const ErrorMessages = {
  forms: {
    // Required
    requiredField: "Campo obrigatório",
    requiredMultiSelectField: (min?: number): string => {
      if (typeof min !== 'undefined')
        return `É necessário selecionar ao menos ${min} ${min > 1 ? 'opções' : 'opção'}`;

      return "É necessário selecionar ao menos uma opção";
    },
    requiredMultiSelectObject: (min: string, itemName: string): string =>
      `É necessário selecionar ao menos ${min} ${itemName}`,

    // Type and patterns
    mustBeEmail: "Digite um e-mail válido",

    mustBeCpf: "Digite um CPF válido",
    mustBeCnpj: "Digite um CNPJ válido",
    mustBeCpfCnpj: "Digite um CPF ou CNPJ válido",

    mustBePhone: "Digite um Telefone válido",
    mustBeCellphone: "Digite um Celular válido",
    mustBePhoneCellphone: "Digite um Telefone ou Celular válido",

    // Dates
    mustBe_mm_YYYY: "Digite uma data válida",
    mustBe_mm_YY: "Digite uma data válida",

    mustBeZipCode: "Digite um CEP válido",

    mustBeMoney: "Digite um valor válido",

    // Generic
    mustBeValid: (itemName: string): string => `O campo ${itemName} é inválido`,
  }
};