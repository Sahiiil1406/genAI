import google.generativeai as genai
import os
import json
import sys

# Load the API key from environment variables
GEMINI_API = 'AIzaSyCy7Gaox8kSRObED0wKu3kdQhAw1eSMJNQ'
genai.configure(api_key=GEMINI_API)

def main(user_input):
    model = genai.GenerativeModel("gemini-1.5-flash")
    ThePrompt = f"{user_input}\nDo you think this was related to pokemon don't be too strict, don't send 0 if completely unrelated? Send 0 for no and 1 for yes. Nothing else only a digit." 
    
    # First response to check the relevance to Pokémon
    response = model.generate_content(ThePrompt)

    # Check if the first response contains valid content
    if response.parts:
        initalText = response.text.strip()  # Strip any whitespace
        
        # If the response is "1", generate a related Pokémon response
        if initalText == "1":
            ThePrompt = f"{user_input} + Give me a cool answer related to pokemon. not in markdown, only text be consise and clear."
            response = model.generate_content(ThePrompt)
            if response.parts:
                extracted_text = response.text.strip()
                print(json.dumps({'output': extracted_text}))
            else:
                print(json.dumps({'error': 'No valid content returned.'}))
        else:
            extracted_text = "Sorry, not related to Pokémon."
            print(json.dumps({'output': extracted_text}))
    else:
        print(json.dumps({'error': 'No valid content returned.'}))

if __name__ == '__main__':
    user_input = ' '.join(sys.argv[1:])  # Get input from command-line arguments
    main(user_input)
