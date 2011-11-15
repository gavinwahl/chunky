;(function(HashTree, global, undefined){
  var Chunky = global.Chunky = function(file)
  {
    return HashTree(file.getAsBinary());
  };
})(HashTree, this);
