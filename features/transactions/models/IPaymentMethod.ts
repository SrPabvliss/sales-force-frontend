export interface IPayMethod {
  id: number
  name: string
  tax: number
  isActive: boolean
}

export const PayMethodTranslations: Record<string, string> = {
  'Credit Card': 'Tarjeta de Crédito',
  'Bank Transfer': 'Transferencia Bancaria',
  'Cash on Delivery': 'Pago contra Entrega',
}
