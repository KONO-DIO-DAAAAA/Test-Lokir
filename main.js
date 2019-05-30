const Discord = require('discord.js');
const fs = require('fs')
const bot = new Discord.Client()
const config = require('./config.json')
bot.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0) return console.log('Команды не найдены')

    console.log(`Loaded ${jsfile.length} commands`)
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        bot.commands.set(props.help.name,props)
    })
})

bot.on('message', async message => {
    let prefix = config.prefix
    let messageArray = message.content.split(' ')
    let command = messageArray[0]
    let args = messageArray.slice(1)

    let command_file = bot.commands.get(command.slice(prefix.length))
    if (command_file) command_file.run(bot, message, args)

    if(message.content.startsWith(prefix + 'Hi')) {
        message.channel.send('Всем привет!')
    }
});

  
bot.on('message', async message => {
    let prefix = config.prefix;
   if(message.content.startsWith(prefix+ 'Lokirchuslo')) {
    let answers = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100"]; //массив ответов
    let rand = Math.floor(Math.random()*answers.length); //получаем случайное число от 0 до `кол-ва ответов`
    message.channel.send(answers[rand]);
    }
  });
  bot.on('message', async message => {
    let prefix = config.prefix;
   if(message.content.startsWith(prefix+ 'randomemoji')) {
    let answers = [":grinning:",":smiling_imp:",":scream:",":spy:",":imp:",":robot:",":doughnut:"]; //массив ответов
    let rand = Math.floor(Math.random()*answers.length); //получаем случайное число от 0 до `кол-ва ответов`
    message.channel.send(answers[rand]);
    }
  });
bot.login(config.token);
bot.on('ready', () => {
    console.log(`${bot.user.username} online`);
    bot.user.setPresence({ game:{ name: 'Скайрим на Холодильнеке', type: 0 }});
});