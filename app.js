$(window).bind('hashchange',function(){
  alert('hashchange')
})

function get_url_hash(){
  return (window.location.hash.length > 0) ?
    window.location.hash.substring(1):""
}
//alert(get_url_hash())
//
class APP {
  constructor(){
    console.log('hello world!')
  }
}

var app = new APP()
