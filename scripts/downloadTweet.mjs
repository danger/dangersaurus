import http from 'https'
import fs, { writeFileSync } from 'fs'
import Twitter from 'twitter'
import { exec } from './util.mjs';
 
var client = new Twitter({
  consumer_key: 'EYRutegHyV4G9jpv1a1QoI4lf',
  consumer_secret: 'GQlYCvHyLQx8N0qbxZMzUKp7T9r4PoiqJS5RC2r5Y7aMKyEasG',
  access_token_key: '3330338902-ismc4FmfWPK3tAjqgs9AtOk0ehR59fGqSDEGAUO',
  access_token_secret: 'NTtMdvqPknqUtnYPPtn2l4xnTH294qxqbgDheKtGscYzM'
});
 
var params = {screen_name: 'cloudyconway'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
    console.log(error)
    process.exit(1)
  }

  const tweet = tweets.find(tweet => !tweet.retweeted_status)
  const imageURL = tweet.extended_entities.media[0].media_url_https
  exec(`curl -o scripts/images/downloaded/image.jpg ${imageURL}`)
  writeFileSync("scripts/images/downloaded/tweet.json", JSON.stringify(tweet))
  exec(`curl -o scripts/images/downloaded/oembed.json https://publish.twitter.com/oembed?url=https://twitter.com/CloudyConway/status/${tweet.id}`)
});
