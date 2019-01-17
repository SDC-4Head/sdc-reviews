import http from "k6/http";
import { sleep, check } from "k6";

const baseUrl = 'http://localhost:3124'

export let options = {
  vus: 10,
  duration: '10s',
}

export default function() {
  let num = Math.floor((Math.random() * 10000000) + 1)
  let res = http.post(`${baseUrl}/api/reviews/rooms/${num}`);
  check(res, {
    'status is 200': r => r.status === 200,
    'status is 500': r => r.status === 500,
  })
  sleep(1);
};