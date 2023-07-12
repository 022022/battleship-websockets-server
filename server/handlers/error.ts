export function error(){

  const toClient = JSON.stringify({
    type: "server_error",
    data: JSON.stringify({})
  });

  return toClient;
}