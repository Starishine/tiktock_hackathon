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
    myTrendingDataSet = {'/tiktokAudio'}
    #look at relevant column(also dataset duplicates were removed and sorted by popularity)
    allSongs = myTrendingDataSet["track_name"].to_list()
    allArtists = myTrendingDataSet["artist_name"].to_list()
  
    
    #then go to those indexes in the  dataset then return that as formatted string
    #frontend then recives a string
    song1 = allSongs[0] + " by " + allArtists[0]
    song2 = allSongs[1] + " by " + allArtists[1]
    song3 = allSongs[2] + " by " + allArtists[2]
    song4 = allSongs[3] + " by " + allArtists[3]
    song5 = allSongs[4] + " by " + allArtists[4]

    return f"The trending audio tracks are as follows: \n {song1} \n {song2} \n {song3} \n {song4} \n {song5}"

def trendingCreators(embeddedInput):
    return print("creator")


def trendingTrends(embeddedInput):
    return print("trend")



if __name__ == "__main__":
    app.run(debug=True)








    
    

