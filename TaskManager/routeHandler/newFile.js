const { router, Todo } = require('./todoHandler');

//PUT
router.put('/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                status: "active"
            }
        }, (err) => {
            if (err) {
                res.status(500).json({
                    error: 'There is server side error'
                });
            } else {
                res.status(200).json({
                    message: "Todos were updated succesfully"
                });

            }
        });

});
