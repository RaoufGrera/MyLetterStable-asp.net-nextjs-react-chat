import { useSprings } from "@react-spring/web";
import { useTranslation } from "next-i18next";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGesture } from "react-with-gesture";
import { accountService, userService } from "src/_services";
import Card from "./Card";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const to = i => ({
  where: "top",
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;
let selectIndex = 0
function Deck(propFrom) {
  const { t } = useTranslation()
  const profileData = propFrom.profileData;
  console.log("Deck", profileData)

  const [gone] = useState(() => new Set());
  const [mesgs, setMesgs] = useState([]);
  //const [data, setData] = useState([]);
  const [session, setSession] = useState(null);




  function loadMsg() {

    accountService.getAll().then(b => {
      console.log("Up", b)
      // setData(b)
      selectIndex = b;
      b.slice().reverse().forEach(element => {
        (element.userName == session) ? element.online = true :
          element.online = false;
      });


      setMesgs(b)


      // selectIndex = mesgs
    });

    setTimeout(() => gone.clear() || set(i => to(i)), 600);

  }
  useEffect(() => {
    const subscription = accountService.onlineUsers.subscribe(x => {
      setSession(x)
    });

    loadMsg()
    return () => subscription.unsubscribe();
  }, []);

  function updateCard(i, w) {

    console.log("where", w)

    if (w == "Right")
      accountService.likeUser(selectIndex[i].id).then(
        toast.success(t('new_like'))
      );


    // console.log("updateCard  ", mesgs)
  }
  const [props, set] = useSprings(mesgs.length, i => ({
    ...to(i),
    from: from(i),
  }))
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);


        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const where = x < 0 ? "Left" : "Right";
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        if (!down && trigger) {
          console.log("INDEX", index)
          console.log("i", i)
          //selectIndex = index;
          console.table("USERS", mesgs)


          console.table("Tab", selectIndex)
          //mesgs[index];
          console.log("where", where)
          console.log("MSG", selectIndex[index])
          console.log("The ID", selectIndex[index].id)
          console.log("The Name", selectIndex[index].name)


          updateCard(index, where)

        }
        if (!down && !trigger) {

          where = "top"

        }




        const scale = down ? 1.1 : 1;
        return {
          where,
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === mesgs.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );


  return (
    <div>
      {session}
      <div>
        <button className="btn btn-light load-more" onClick={loadMsg} >{t('show_more')}</button>
      </div>
      <div>
        {mesgs &&

          props.map(({ where, x, y, rot, scale }, i) => (

            <Card



              key={i}
              fun={updateCard}
              where={where}
              i={i}
              x={x}
              y={y}
              profileData={profileData}
              rot={rot}
              scale={scale}
              trans={trans}
              cards={cards}
              objs={mesgs}
              bind={bind}
            >
            </Card>
          ))
        }

      </div>
    </div>
  )
}


export default Deck;
