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
import pandas as pd

model = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")

app = Flask(__name__)
#main route
@app.route("/semanticSearch/<userInput>")
def keyword_classificatio(userInput):
    embeddedInput = model.encode(userInput)
    embeddedTrendingAudio = model.encode("Latest trending tiktok audios")
    embeddedTrendingCreators = model.encode("Trending tiktok creators")
    embeddedTrendingTrends = model.encode("Trending tiktok videos now")

    #cosine similarity so see to which 3 options embedded input is closest to
    similarityToAudio = cosine_similarity(embeddedInput.reshape(1,-1), embeddedTrendingAudio.reshape(1,-1))
    similarityToCreators = cosine_similarity(embeddedInput.reshape(1,-1), embeddedTrendingCreators.reshape(1,-1))
    similarityToTrends = cosine_similarity(embeddedInput.reshape(1,-1), embeddedTrendingTrends.reshape(1,-1))

    #cos sim range is [-1,1], the bigger then the btr the result
    if similarityToAudio > similarityToCreators and similarityToAudio > similarityToTrends:
        str = trendingAudio(embeddedInput)
        return str
    if similarityToCreators > similarityToAudio and similarityToCreators > similarityToTrends:
        str = trendingCreators(embeddedInput)
        return str
    if similarityToTrends > similarityToCreators and similarityToTrends > similarityToAudio:
        str = trendingTrends(embeddedInput)
        return str
    

def trendingAudio(embeddedInput):
    #vectorise the audio dataset then return top results
    myTrendingDataSet = pd.read_csv('/Users/deepamalika/tiktock_hackathon/ai_chatbot/src/backend/tiktokAudio.csv')
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
    
    return f"The trending audio tracks are as follows: \n {song1}, \n {song2}, \n {song3}, \n {song4}, \n {song5}"

def trendingCreators(embeddedInput):
    #vectorise the creators dataset then return top results
    myTrendingDataSet = pd.read_csv('/Users/deepamalika/tiktock_hackathon/ai_chatbot/src/backend/trending_authors.csv')
    #look at relevant column(also dataset duplicates were removed and sorted by popularity)
    allCreators = myTrendingDataSet["Author Unique ID"].to_list()
    
    #then go to those indexes in the  dataset then return that as formatted string
    #frontend then recives a string
    creator1 = allCreators[0]
    creator2 = allCreators[1]
    creator3 = allCreators[2]
    creator4 = allCreators[3]
    creator5 = allCreators[4]

    return f"The trending creators are as follows: \n {creator1}, \n {creator2}, \n {creator3}, \n {creator4}, \n {creator5}"

def trendingTrends(embeddedInput):
     #vectorise the popular videos dataset then return top results
    myTrendingDataSet = pd.read_csv('/Users/deepamalika/tiktock_hackathon/ai_chatbot/src/backend/trending_videos.csv')
    #look at relevant column(also dataset duplicates were removed and sorted by popularity)
    allVideoLinks = myTrendingDataSet["video_link"].to_list()
    
    #then go to those indexes in the  dataset then return that as formatted string
    #frontend then recives a string
    vid1 = allVideoLinks[0]
    vid2 = allVideoLinks[1]
    vid3 = allVideoLinks[2]
    vid4 = allVideoLinks[3]
    vid5 = allVideoLinks[4]

    return f"The trending videos are as follows: \n {vid1}, \n {vid2}, \n {vid3}, \n {vid4}, \n {vid5}"




if __name__ == "__main__":
    app.run(debug=True)








    
    

