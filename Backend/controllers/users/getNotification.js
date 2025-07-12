const User = require('../../Schemas/user.schema');
const Notification = require('../../Schemas/notification.schema')

async function getNotifications(req, res) {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ userId: userId });

        return res.status(200).json({
            status: "success",
            data: notifications
        });
    } catch (error) {
        console.error(`Error ${error}`);
        return res.status(500).json({
            status: "error",
            data: "Unknown error occurred",
        });
    }
}

module.exports = getNotifications;