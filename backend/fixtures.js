const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const Artist = require('./models/Artists');
const Album = require('./models/Albums');
const Track = require('./models/Track');
const User = require('./models/User');

mongoose.connect(config.database, config.databaseOpt);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        for(let nameCollection of collections) {
            await db.dropCollection(nameCollection.name);
        }
    } catch (e) {
        console.log(e);
    }
    try {
        const [architects, inThisMoment] = await Artist.create({
            name: 'Architects',
            image: '9Y2xNEIGPKRAhJTfTnu7x.jpg',
            info: 'Architects — (в переводе с англ. — «Архитекторы») британская металкор-группа. Была сформирована в 2004 году в Брайтоне, Великобритания. За время своего существования коллектив несколько раз изменял своё название — InHarmonic, затем Counting the Days. Несколько лет так они и именовались, а затем изменили название на нынешнее. Группа известна своим агрессивным и эмоциональным вокалом, переплетающимся с динамичными гитарными партиями. За карьеру выпущено 7 полноформатных и один мини-альбом.'
        }, {
            name: 'In This Moment',
            image: 'IlhkYUR1Uf_OAiB7GhjuP.jpg',
            info: 'In This Moment — американская группа, образованная в Лос-Анджелесе вокалисткой Марией Бринк и гитаристом Крисом Хоувортом в 2005 году.[6]. Также к группе присоединился барабанщик Джефф Фабб. В начале творческого пути трио выступало под именем Dying Star. Недовольная своим музыкальным стилем, группа полностью изменила звучание, и сменила название на In This Moment и также добавила двух участников - гитариста Блэйка Бунзела и басиста Доша Ньюэлла. В 2005 году Ньюэлл ушёл из группы и был заменён Паскалем Ромеро, которого позже заменит Джесси Лэндри.Дебютный альбом, Beautiful Tragedy, был выпущен в 2007 году. Следующее творение под названием The Dream был издан в следующем году и дебютировал на 73 строчке Billboard 200. Третий альбом группы под названием A Star-Crossed Wasteland был выпущен в 2010. Четвёртый альбом под названием Blood был выпущен в августе 2012 года и дебютировал на 15 строчке Billboard 200. Пятый альбом под названием Black Widow был выпущен 17 ноября 2014 года и дебютировал на 8 строчке американских чартов (что является наивысшей позицией в чартах на сегодняшний день). Шестой альбом под названием Ritual был выпущен летом 2017 и дебютировал на 23 строчке.'
        });
        const [holyHell, allOurGodsHaveAbandonedUs, blood] = await Album.create({
            name: 'Holy Hell',
            image: 'HBJaKniHKXQHlC6tqsytz.jpg',
            year: '2018',
            artist: architects
        }, {
            name: 'All Our Gods Have Abandoned Us',
            image: 'hLILvSeQCoGM7xO0DHInN.jpg',
            year: '2016',
            artist: architects
        }, {
            name: 'Blood',
            image: 'Ga-cZZAGKfiRJEv4unQNr.jpg',
            year: '2012',
            artist: inThisMoment
        });
        await Track.create({
            name: 'Death Is Not Defeat',
            duration: '3:45',
            trackNumber: 1,
            album: holyHell
        }, {
            name: 'Hereafter',
            duration: '4:15',
            trackNumber: 2,
            album: holyHell
        }, {
            name: 'Mortal After All',
            duration: '3:39',
            trackNumber: 3,
            album: holyHell
        }, {
            name: 'Holy Hell',
            duration: '4:13',
            trackNumber: 4,
            album: holyHell
        }, {
            name: 'Damnation',
            duration: '4:08',
            trackNumber: 5,
            album: holyHell
        }, {
            name: 'Royal Beggars',
            duration: '4:01',
            trackNumber: 6,
            album: holyHell
        }, {
            name: 'Modern Misery',
            duration: '4:13',
            trackNumber: 7,
            album: holyHell
        }, {
            name: 'Dying to Heal',
            duration: '3:50',
            trackNumber: 8,
            album: holyHell
        }, {
            name: 'The Seventh Circle',
            duration: '1:48',
            trackNumber: 9,
            album: holyHell
        }, {
            name: 'Doomsday',
            duration: '4:08',
            trackNumber: 10,
            album: holyHell
        }, {
            name: 'A Wasted Hymn',
            duration: '4:34',
            trackNumber: 11,
            album: holyHell
        }, {
            name: 'Nihilist',
            duration: '2:51',
            trackNumber: 1,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'Deathwish',
            duration: '3:52',
            trackNumber: 2,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'Phantom Fear',
            duration: '4:06',
            trackNumber: 3,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'Downfall',
            duration: '4:04',
            trackNumber: 4,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'Gone with the Wind',
            duration: '3:45',
            trackNumber: 5,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'The Empty Hourglass',
            duration: '4:11',
            trackNumber: 6,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'A Match Made in Heaven',
            duration: '3:48',
            trackNumber: 7,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'Gravity',
            duration: '3:18',
            trackNumber: 8,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'All Love Is Lost',
            duration: '4:20',
            trackNumber: 9,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'From the Wilderness',
            duration: '3:44',
            trackNumber: 10,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'Memento Mori',
            duration: '8:12',
            trackNumber: 11,
            album: allOurGodsHaveAbandonedUs
        }, {
            name: 'Rise With Me',
            duration: '2:07',
            trackNumber: 1,
            album: blood
        }, {
            name: 'Blood',
            duration: '3:27',
            trackNumber: 2,
            album: blood
        }, {
            name: 'Adrenalize',
            duration: '4:15',
            trackNumber: 3,
            audioFile: '9_lUVaaCWyQsRCAgD6X54.mp3',
            album: blood
        }, {
            name: 'Whore',
            duration: '4:05',
            trackNumber: 4,
            album: blood
        }, {
            name: "You're Gonna Listen",
            duration: '3:43',
            trackNumber: 5,
            album: blood
        }, {
            name: 'It Is Written',
            duration: '0:30',
            trackNumber: 6,
            album: blood
        }, {
            name: 'Burn',
            duration: '4:44',
            trackNumber: 7,
            album: blood
        }, {
            name: 'Scarlet',
            duration: '3:50',
            trackNumber: 8,
            album: blood
        }, {
            name: 'Aries',
            duration: '0:41',
            trackNumber: 9,
            album: blood
        }, {
            name: 'From The Ashes',
            duration: '4:26',
            trackNumber: 10,
            album: blood
        }, {
            name: 'Beast Within',
            duration: '3:49',
            trackNumber: 11,
            album: blood
        }, {
            name: 'Comanche',
            duration: '3:17',
            trackNumber: 12,
            album: blood
        }, {
            name: 'The Blood Legion',
            duration: '4:29',
            trackNumber: 13,
            album: blood
        }, {
            name: '11:11',
            duration: '4:51',
            trackNumber: 14,
            album: blood
        });
        await User.create({
            username: 'John',
            password: 'testpass',
            token: nanoid()
        }, {
            username: 'Domino',
            password: 'testpass',
            token: nanoid()
        });
    } catch (e) {
        console.log(e);
    }
    db.close();
});

