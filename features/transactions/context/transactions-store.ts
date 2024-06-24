import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IPayMethod } from '../models/IPaymentMethod'
import { ICreateTransaction, ITransaction, IUpdateTransaction } from '../models/ITransaction'
import { TransactionsDataSourceImpl } from '../services/datasource'

interface StoreState {
  transactions: ITransaction[]
  payMethods: IPayMethod[]
  setPayMethods: (payMethods: IPayMethod[]) => void
  setTransactions: (transactions: ITransaction[]) => void
  getAllTransactions: () => Promise<void>
  getTransactionById: (id: number) => Promise<void>
  createTransaction: (transaction: ICreateTransaction) => Promise<void>
  updateTransaction: (id: number, transaction: IUpdateTransaction) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
  getPayMethods: () => Promise<void>
}

const DEFAULT_TASKS: ITransaction[] = []

const DEFAULT_PAY_METHODS: IPayMethod[] = []

const STORE_NAME = 'transactions'

export const useTransactionsStore = create<StoreState>(
  persist(
    (set, get) => ({
      transactions: DEFAULT_TASKS,
      payMethods: DEFAULT_PAY_METHODS,
      setPayMethods: (payMethods: IPayMethod[]) => {
        set({ payMethods })
      },
      setTransactions: (transactions: ITransaction[]) => {
        set({ transactions })
      },
      getAllTransactions: async () => {
        const transactions = await TransactionsDataSourceImpl.getInstance().getAll()
        set({ transactions })
        get().getPayMethods()
      },
      getTransactionById: async (id: number) => {
        await TransactionsDataSourceImpl.getInstance().getById(id)
      },
      createTransaction: async (transaction: ICreateTransaction) => {
        await TransactionsDataSourceImpl.getInstance().create(transaction)
      },
      updateTransaction: async (id: number, transaction: IUpdateTransaction) => {
        await TransactionsDataSourceImpl.getInstance().update(id, transaction)
        get().getAllTransactions()
      },
      deleteTransaction: async (id: number) => {
        await TransactionsDataSourceImpl.getInstance().delete(id)
        get().getAllTransactions()
      },
      getPayMethods: async () => {
        const payMethods = await TransactionsDataSourceImpl.getInstance().getPayMethods()
        set({ payMethods })
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    },
  ) as StateCreator<StoreState>,
)
