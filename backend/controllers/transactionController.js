const Transaction = require("../models/transactionModel");
const User = require("../models/authModel");


//create transaction
exports.createTransaction = async (req, res) => {
  const { amount, description, from, to } = req.body;
  try {
    const sender = await User.findOne({ username: from });
    const recipient = await User.findOne({ username: to });


    if (!sender || !recipient) {
      return res.status(404).json({ message: "Sender or recipient not found" });
    }

    // Check if sender has enough balance
    //   if (sender.balance < amount) {
    //     return res.status(400).json({ message: 'Insufficient balance' });
    //   }
    const transaction = new Transaction({
        amount,
        description,
        from: sender.username,
        to: recipient.username,
      });

    sender.balance -= amount;
    recipient.balance = (parseInt(recipient.balance, 10) || 0) + (parseInt(amount, 10) || 0);


    await sender.save();
    await recipient.save();
  
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Transaction not successful" });
  }
};

//get transaction details
exports.getTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.find();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Transaction not found" });
  }
};
