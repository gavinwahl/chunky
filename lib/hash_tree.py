import hashlib
import math
import copy

CHUNK_SIZE = 1

def hash(x):
    m = hashlib.sha256()
    m.update(x)
    return m.digest()


def hash_bottom(input):
    chunk_hashes = [hash(input.read(CHUNK_SIZE))]
    while True:
        chunk = input.read(CHUNK_SIZE)
        if not chunk:
            break
        chunk_hashes.append(hash(chunk))

    return chunk_hashes

def hash_layer(lst):
    chunk_hashes = []
    lst = copy.copy(lst)
    while lst:
        a = lst.pop(0)
        try:
            b = lst.pop(0)
            chunk_hashes.append(hash(a + b))
        except IndexError:
            chunk_hashes.append(a)
    return chunk_hashes

def hash_tree(input):
    levels = [hash_bottom(input)]
    while len(levels[-1]) > 1:
        levels.append(hash_layer(levels[-1]))
    for layer in reversed(levels):
        for hash in layer:
            yield hash
