module.exports.run = async (bot ,message, args) => {
    let mess = await message.channel.send('Тестики от ДЫО')
    await mess.react('🍌')
    await mess.react('🍆')
    const collector = mess.createReactionCollector((reaction, user) => reaction.emoji.name === '🍌' || reaction.emoji.name === '🍆' && user.id == message.author.id,{time: 6000000})

    collector.on('collect', async r => {
        switch(r.emoji.name) {
            case '🍌' :
                 await mess.edit('Банан')
             break
             case '🍆':
                 await mess.edit('Кабочек от ДЫО')
             break 
        }
    })
    collector.on('end', async() => {
       await mess.edit('Тестик закончен')
    })
}

module.exports.help = {
    name: 'test'
}