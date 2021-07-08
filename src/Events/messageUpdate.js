const Event = require('../Structures/Event');

module.exports = class extends Event {

    async run(oldMessage, newMessage) {

        if (oldMessage.author.bot) return;
        const editedmessage = this.client.editedmessage.get(oldMessage.channel.id) || [];
        if(editedmessage.length > 5) editedmessage.slice(0, 4);

        editedmessage.unshift({
            oldmsg: oldMessage,
            newmsg: newMessage,
            time: Date.now(),
        });

        this.client.editedmessage.set(oldMessage.channel.id, editedmessage);
    }
};
