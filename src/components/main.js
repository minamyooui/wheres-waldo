import img1 from '../assets/images/ad2022-1.png';
import img2 from '../assets/images/ad2022-2.png';
import React, { useEffect, useState } from "react";
import db from './utils/firebase';
import { doc, getDoc, getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import Target from './Target';
import Nav from './Nav';
import LoadMenu from './LoadMenu';
import Alert from './Alert';
import Leaderboard from './Leaderboard';
import { getCount } from './utils/utils';
import CC from '../assets/images/cc.jpg';
import Kamaji from '../assets/images/kamaji.jpg';
import Killy from '../assets/images/killy.webp';
import Leeloo from '../assets/images/leeloo.webp';
import Minions from '../assets/images/minions.jpg';
import Yubaba from '../assets/images/yubaba.png';
import En from '../assets/images/en.webp';
import Lupin from '../assets/images/lupin.webp';
import Neo from '../assets/images/neo.webp';
import Roger from '../assets/images/roger.png';
import Spike from '../assets/images/spike.jpg';
import Vash from '../assets/images/vash.webp';
import Waldo from '../assets/images/waldo.webp';

function Main() {

  const [target, setTarget] = useState({ on: false, x: null, y: null });
  const [drop, setDrop] = useState(false);
  const [chars, setChars] = useState([{found: false}]);
  const [start, setStart] = useState(false);
  const [alert, setAlert] = useState(false);
  const [time, setTime] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [join, setJoin] = useState(false);
  const [map, setMap] = useState(1);
  const map1Img = {'C.C.': CC, Kamaji, Killy, Leeloo, Minions, Yubaba};
  const map2Img = {En, 'Lupin III': Lupin, Neo, Roger, Spike, Vash, Waldo};

  useEffect(() => {
    getChars();
    setLeaderboard(getLeaderboard());
  }, [map]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert]);

  function foundAllChars() {
    const arr = chars.map(e => {
      e.found = true
      return e;
    });
    setChars(arr);
  }

  async function getChars() {
    const m = (map === 1) ? 'map1' : 'map2';
    const imgArr = (map === 1) ? map1Img : map2Img;
    const querySnapshot = await getDocs(collection(db, m));
    const arr = [];
    querySnapshot.forEach((doc) => {
      const {x, y, url} = doc.data();
      arr.push({name: doc.id, x, y, url, img: imgArr[doc.id]});
    });
    setChars(arr);
  }

  function startGame(map) {
    if (map === 1) {
      setMap(1);
    } else {
      setMap(2);
    }
    setStart(true);
  }

  function photoClick (e) {
    if (target.on) {
      setTarget({ on: false });
    } else {
      setTarget({ on: true, x: e.pageX, y: e.pageY });
    }
  }

  async function getLoc(name) {
    const m = map === 1 ? 'map1' : 'map2';
    const docRef = doc(db, m, name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } 
      return null;
  }

  function foundChar(name) {
    setChars(chars => chars.map(e => {
      if (e.name === name) e.found = true;
      return e;
    }));
  }

  function alertChar(found = false, name = null) {
    if (!found) setAlert({found});
    setAlert({found, name});
  }

  async function checkTarget(name) {
    const data = await getLoc(name);
    if (!data) {
      console.log('no data');
      return;
    }
    const {x, y} = data;
    const img = document.getElementById('gameImg');
    const height = img.offsetHeight;
    const width = img.offsetWidth;
    const relX = target.x / width;
    const relY = target.y / height;
    const testX = Math.abs(relX - x) < 0.05;
    const testY = Math.abs(relY - y) < 0.03; 
    if (testX && testY) {
      alertChar(true, name);
      foundChar(name);
      return;
    }
    alertChar();
  }

  async function save(name) {
    await saveScore(name);
    await handleLeaderboard(time);
    setJoin(false);
  }

  async function handleLeaderboard(t) {
    const list = await getLeaderboard();
    if (list.length < 10) {
      setJoin(true);
    } else {
      const last = list.at(-1);
      if (t < last.time) {
        setJoin(true);
      } else {
        setJoin(false);
      }
    }
    setLeaderboard(list);
  }
  
  async function saveScore(name) {
    const cName = (map === 1) ? 'leaderboard1' : 'leaderboard2';
    try {
      await addDoc(collection(getFirestore(), cName), {
        name,
        time: time,
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

  async function getLeaderboard() {
    const cName = (map === 1) ? 'leaderboard1' : 'leaderboard2';
    const q = query(collection(db, cName), orderBy('time', 'asc'), limit(10));
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(doc => {
      const { name, time } = doc.data();
      arr.push({name, time});
    });
    return arr;
  }

  async function getTime(t) {
    setTime(t);
    await handleLeaderboard(t);
  }

  function handleClick() {
    if (target.on) setTarget({ on: false });
    if (drop) setDrop(false);
  }

  return (
    <div id="main" onClick={handleClick}>
      <Nav chars={chars} start={start} dropHook={[drop, setDrop]} sendTime={getTime} />
      <img id='gameImg' src={map === 1 ? img1 : img2} onClick={photoClick} />
      {alert &&
        <Alert alert={alert} />
      }
      {!start &&
        <LoadMenu start={startGame} />
      }
      {target.on && 
        <Target left={target.x} top={target.y} check={checkTarget} chars={chars}/>
      }
      {getCount(chars) === 0 && 
        <Leaderboard list={leaderboard} time={time} join={join} save={save}/>
      }
    </div>
  )
}

export default Main;