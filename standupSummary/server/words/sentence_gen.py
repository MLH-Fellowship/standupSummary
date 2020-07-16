import random

class MarkovGenerator():
    """
    Use a markov chain to generate the next word randomly from bigrams.
    """

    def __init__(self, corpus):
        self.cache = {}
        self.corpus = corpus
        self.words = self.file_to_words()
        self.word_size = len(self.words)
        self.database()

    def file_to_words(self):
        words = []
        for line in self.corpus:
            words += line.split()
        return words

    def bigrams(self):
        """ Generates bigrams from the given data string.
        """
        if len(self.words) < 2:
            return

        for i in range(len(self.words) - 1):
            yield (self.words[i], self.words[i+1])

    def database(self):
        for w1, w2 in self.bigrams():
            key = w1
            if key in self.cache:
                self.cache[key].append(w2)
            else:
                self.cache[key] = [w2]

    def generate_markov_text(self, size):
        seed = random.randint(0, self.word_size-2)
        seed_word, next_word = self.words[seed], self.words[seed+1]
        w1, w2 = seed_word, next_word
        gen_words = []
        for i in range(size):
            gen_words.append(w1)
            w1, w2 = w2, random.choice(self.cache[w2])
        gen_words.append(w2)
        return ' '.join(gen_words)


def sentence_gen(corpus, size=7):
    if not size:
       size = random.randint(1, 15)
    m = MarkovGenerator(corpus)
    sentence = m.generate_markov_text(size)
    return sentence