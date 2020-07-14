import os
import requests
import json
import re
from collections import Counter

from dotenv import load_dotenv

# Set up paths
script_dir = os.path.dirname(__file__)  # <-- absolute dir the script is in

# Get environment variables
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
GITHUB_USERNAME = os.getenv('GITHUB_USERNAME')
GITHUB_USER_ID = int(os.getenv('GITHUB_USER_ID'))
API_ROOT = "https://api.github.com"
ORG_ROOT = API_ROOT + "/orgs/MLH-Fellowship"

POD_NAME = "pod-0-1-2"  # TODO: change this

# Get list of stop words - this file is downloaded from nltk website
STOP_WORDS_PATH = os.path.join(script_dir, 'english_stopwords.txt')
STOP_WORDS = set(line.strip() for line in open(STOP_WORDS_PATH)) | set(
    ["today", "blockers", "yesterday", "shoutouts"])


def check_pod_name(pod_name):
    """
    Make sure pod name is in the right input format (e.g. pod-0-1-2) for
    Github API.
    >>> check_pod_name("pod 0-1-2")
    False
    >>> check_pod_name("pod-0-1-2")
    True
    """
    result = bool(re.match("pod-\d-\d-\d$", pod_name))
    return result


def check_team_membership(username, pod_name):
    """
    Given a username and a 
    """
    url = ORG_ROOT + \
        "/teams/{pod_name}/memberships/{user}".format(
            user=username, pod_name=pod_name)
    response = requests.get(url=url, auth=(
        GITHUB_USERNAME, GITHUB_TOKEN)).json()
    try:
        if response['state'] == 'active':
            return True
        return False
    except KeyError:
        return False


def get_discussion_list_by_pod(pod_name):
    url = ORG_ROOT +\
        "/teams/{pod_name}/discussions".format(pod_name=pod_name)
    response = requests.get(url, auth=(
        GITHUB_USERNAME, GITHUB_TOKEN)).json()
    return response


def get_comment_by_user(user_id, pod_name, discussion):
    url = ORG_ROOT +\
        "/teams/{pod_name}/discussions/{discussion_number}/comments".format(
            pod_name=pod_name, discussion_number=discussion['number'])
    response = requests.get(url=url, auth=(
        GITHUB_USERNAME, GITHUB_TOKEN)).json()
    return [comment for comment in response if comment['author']['id'] == user_id]


def process_user_comment(comment_body):
    stripped_comment = re.sub("\r\n", " ", comment_body)
    stripped_comment = re.sub(r'[^a-z A-Z 0-9]+', '', stripped_comment)
    stripped_comment = re.sub(' +', ' ', stripped_comment)
    stripped_comment = stripped_comment.lower()
    return stripped_comment


def get_word_frequency(user_id, pod_name):
    """
    Return a list of words and their frequencies
    >>> freq = get_word_frequency(34909206, "pod-0-1-2")
    >>> freq[:5]
    [('work', 6), ('code', 6), ('keras', 5), ('scikitlearn', 5), ('prs', 5)]
    """

    if not check_pod_name(pod_name):
        raise Exception(
            "Pod name has to follow this format: 'pod-[0-9]-[0-9]-[0-9]")
    if not check_team_membership(GITHUB_USERNAME, pod_name):
        raise Exception(
            "You have to be a member of this pod/organization in order to see the comment frequency")

    comment_list = []

    for discussion in get_discussion_list_by_pod(pod_name):
        comment = get_comment_by_user(
            user_id=GITHUB_USER_ID, pod_name=pod_name, discussion=discussion)
        if comment:
            processed_comment = process_user_comment(comment[0]['body'])
            comment_list.append(processed_comment)

    comment_list = ''.join(comment_list)
    freq = Counter([word for word in comment_list.split()
                    if word not in STOP_WORDS]).most_common()
    return freq


if __name__ == "__main__":
    freq = get_word_frequency(GITHUB_USER_ID, POD_NAME)
    print("Five common words by user {ID} in {pod_name}: \n".format(
        ID=GITHUB_USER_ID, pod_name=POD_NAME), freq[:5])