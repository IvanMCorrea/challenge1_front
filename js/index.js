let handleLoadTable = document.querySelector("#handleLoadTable");
handleLoadTable.addEventListener("click", async (e)=>{
    e.preventDefault();
    let fetchData = await fetch(`http://localhost:3001/api/leaderboard/scrapper`, {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      let data = await fetchData.json();
      console.log(data)
})