import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.reduce((acc, transaction) => {
      const value = +transaction.value; // convertendo o valor que vem do banco como string
      return transaction.type !== 'income' ? acc : acc + value;
    }, 0);

    const outcome = transactions.reduce((acc, transaction) => {
      const value = +transaction.value; // convertendo o valor que vem do banco como string
      return transaction.type !== 'outcome' ? acc : acc + value;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
