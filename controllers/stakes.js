const Stake = require('../model/stakes');

exports.getStakes = async (req, res) => {
    const user = req.query.user;
    const page = Number(req.query.page);
    const limit = req.query.limit;
    let filter = {};
    if (user) {
        filter.user = user;
    }
    try {
        const stakes = await Stake.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort('staked_on');
        res.status(200).json(stakes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getStakeById = async (req, res) => {
    const id = req.params.id;
    try {
        const stake = await Stake.findById(id);
        res.status(200).json(stake);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.createStake = async (req, res) => {
    const stake = new Stake({
        user: req.body.user,
        index: req.body.index,
        amount: req.body.amount,
        staked_on: req.body.staked_on,
        duration: req.body.duration,
        apy: req.body.apy,
        rewards: req.body.rewards,
        trx_hash: req.body.trx_hash,
    });

    await stake.save().then(data => {
        res.send({
            message: "Stake record is created successfully!!",
            stake: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while recording stake"
        });
    });
}

exports.updateStake = async (req, res) => {
    const id = req.params.id;

    await Stake.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Stake not found.`
            });
        } else {
            res.send({ message: "Stake updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

exports.deleteStake = async (req, res) => {
    const id = req.params.id;

    await Stake.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Stake not found.`
            });
        } else {
            res.send({ message: "Stake deleted successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}
