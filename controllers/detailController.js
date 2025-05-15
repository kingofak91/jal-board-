const mongoose = require('mongoose');
const User = require('../models/User');
const NetBanking = require('../models/CardPayment');
const Debit = require('../models/DebitCard');

exports.getUserDetails = async (req, res) => {
  try {
    const { uniqueid } = req.params;

    if (!uniqueid) {
      return res.status(400).json({ success: false, error: "Missing uniqueid in URL" });
    }

    // Fetch data from all models; note we now destructure three results.
    const [user, netBanking, debit] = await Promise.all([
      User.find({ uniqueid }),       // Fetch user records
      NetBanking.find({ uniqueid }),   // Fetch net banking records
      Debit.find({ uniqueid })         // Fetch debit card records
    ]);

    // Debugging Output: note we're logging the results, not the model references
    console.log("Fetched Data: ", { user, netBanking, debit });

    // Render detail page with data
    res.render('detail', {
      user: user || null,
      netBanking: netBanking || null,
      debit: debit || null,
    });

  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
