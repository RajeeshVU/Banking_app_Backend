import MongoServices from "../../../shared/genericService/genericService.js";
import accountModel from "../../../models/account/account.js";
import { balanceCalculator } from "../../../utils/balance Calculator/balanceCalculator.js";

export const transaction = async (req, res) => {
  const mongoService = new MongoServices(accountModel);
 
  const data = (await mongoService.find(req.params.id)).data;

  const type = req.query.type;
  const balance = balanceCalculator(
    type,
    data.balance,
    req.body.transaction.amount
  );
 data.transactions.push(req.body.transaction);
  const response = await mongoService.updateById(req.params.id, {
    ...data._doc,
    balance: balance,
    transactions: data.transactions,
  });
  res.status(response.status).json(response);
};
