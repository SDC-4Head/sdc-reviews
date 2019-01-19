import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 1000,
  duration: '300s',
}

export default function() {
  let num = Math.floor((Math.random() * 10000000) + 1);
  let res = http.get(`http://localhost:3124/rooms/${num}`);
  check(res, {
    'status is 200': r => r.status === 200,
  })
};