#Tasks: vectorise trending dataset. Pass into ML to train.
'''
then app.main() route backend code to receive fetch and u call correct method 
after keyword classificatio of user input(e.g creator kewyword then go creator method).
Vectorise the
input then u match it to ur dataset using k-neighbour so closest retrieved 
then return it. 
'''

device='cpu'

from flask import Flask
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pandas
model = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")

app = Flask(__name__)
#main route
@app.route("/semanticSearch/<userInput>")
def keyword_classificatio(userInput):
    embeddedInput = model.encode(userInput)
    embeddedTrendingAudio = model.encode("Latest trending tracks")
    embeddedTrendingCreators = model.encode("Trending creators")
    embeddedTrendingTrends = model.encode("Trending tiktok trends now")

    #cosine similarity so see to which 3 options embedded input is closest to
    similarityToAudio = cosine_similarity(embeddedInput, embeddedTrendingAudio)
    similarityToCreators = cosine_similarity(embeddedInput, embeddedTrendingCreators)
    similarityToTrends = cosine_similarity(embeddedInput, embeddedTrendingTrends)

    #cos sim range is [-1,1], the bigger then the btr the result
    if similarityToAudio > similarityToCreators and similarityToAudio > similarityToTrends:
        return trendingAudio(embeddedInput)
    if similarityToCreators > similarityToAudio and similarityToCreators > similarityToTrends:
        return trendingCreators(embeddedInput)
    if similarityToTrends > similarityToCreators and similarityToTrends > similarityToAudio:
        return trendingTrends(embeddedInput)
    

def trendingAudio(embeddedInput):
    #vectorise the audio dataset then K-neighbours search to return closest k vectors
    myTrendingDataSet = { 'prettyLittleBaby'}
    df = pandas.DataFrame(myTrendingDataSet)
    embeddedDf = model.encode(df)

    import numpy as np
    from sklearn.neighbors import NearestNeighbors
    #top 5 output will be returned
    neigh = NearestNeighbors(n_neighbors=5)
    #fit our data into the neigh
    neigh.fit(embeddedDf)
    dist, index = neigh.kneighbors(embeddedInput)
    index.toarray()

    #then go to those indexes in the  dataset then return that as formatted string
    #frontend then recives a string


def trendingCreators(embeddedInput):
    return print("creator")


def trendingTrends(embeddedInput):
    return print("trend")





    
    

