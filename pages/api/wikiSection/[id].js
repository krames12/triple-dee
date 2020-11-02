const axios = require("axios")
const wikiapi = require("wikiapi")

async function getWikiData (url) {
  return await axios.get(url)
  .then( ({data}) => data )
  .catch( error => error)
}

module.exports = async (request, response) => {
  // Good 'ol axios way of doing things
  // action=parse&prop=sections&page=List_of_Diners,_Drive-Ins_and_Dives_episodes&section=2&prop=wikitext
  // let wikiUrl = "https://en.wikipedia.org/w/api.php?" + 
  //   new URLSearchParams({
  //     action: "parse",
  //     page: "List_of_Diners,_Drive-Ins_and_Dives_episodes",
  //     section: request.query.id,
  //     format: "json",
  //     prop: "wikitext"
  //   })

  // let wikiResults = await getWikiData(wikiUrl);
  // response.status(200).json(wikiResults)
  
  // WikiApi npm package
  const wiki = new wikiapi('en')
  let page_data = await wiki.page('List_of_Diners,_Drive-Ins_and_Dives_episodes')
  // page_data.parse().each('template', token => console.log(token))

  response.status(200).json(page_data.wikitext)
}