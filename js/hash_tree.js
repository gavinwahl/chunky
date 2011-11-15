;(function(sha256, global, undefined){
  var HashTree = global.HashTree = function(input)
  {
    var levels = [hash_bottom(input)]
      , last_level = levels[levels.length - 1];

    while (last_level.length > 1)
    {
      levels.push(hash_layer(last_level));

      last_level = levels[levels.length - 1];
    }

    return {
      levels: levels,
      root_hash: levels[levels.length -1][0]
    };
  };
  HashTree.CHUNK_SIZE = 1024;

  var hash = HashTree.hash = function (input) {
    return sha256(input, {asBytes: true});
  };

  var hash_bottom = HashTree.hash_bottom = function(input) {
    var i = HashTree.CHUNK_SIZE
      , chunk_hashes = [hash(input.slice(0, HashTree.CHUNK_SIZE))]
      , chunk;
    
    while (chunk = input.slice(i, i + HashTree.CHUNK_SIZE))
    {
      chunk_hashes.push(hash(chunk));
      i += HashTree.CHUNK_SIZE;
    }

    return chunk_hashes;
  };

  var hash_layer = HashTree.hash_layer = function(lst) {
    var chunk_hashes = []
      , a
      , b
      , lst = lst.slice();

    while ( a = lst.shift() )
    {
      if ( b = lst.shift() )
        chunk_hashes.push(hash(a.concat(b)));
      else
        chunk_hashes.push(a);
    }
      
    return chunk_hashes;
  };


})(Crypto.SHA256, this);
