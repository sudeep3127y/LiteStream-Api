import time
import schedule

# Replace this dictionary with actual data from an anime API or website
anime_schedule = {
    "Naruto": {"time": "18:00", "day": "Monday"},
    "One Piece": {"time": "19:00", "day": "Tuesday"},
    # Add more anime and their airing times here
}

# Format the time and day into a schedule.every()-compatible format
def format_time_and_day(anime_time, anime_day):
    return f"{anime_day} {anime_time}:00"

# Create a schedule for each anime
for anime, details in anime_schedule.items():
    scheduled_time = format_time_and_day(details["time"], details["day"])
    schedule.every().weekday.at(scheduled_time).do(anime_timer, anime)

def anime_timer(anime):
    print(f"It's time for {anime}!")
    # You can add a function to play the anime here, for example

# Keep the script running and check the schedule every minute
while True:
    schedule.run_pending()
    time.sleep(60)