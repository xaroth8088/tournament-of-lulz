from tournament_of_lulz.modules.results.model_results import ModelResults
from tournament_of_lulz.exceptions.service_exception import ServiceException


def post(data):
    if 'tournament' not in data:
        raise ServiceException(400, "No tournament_id present")
    if 'winner_id' not in data:
        raise ServiceException(400, "No winner_id present")
    if 'loser_id' not in data:
        raise ServiceException(400, "No loser_id present")

    tournament_id = int(data['tournament'])
    winner_id = int(data['winner_id'])
    loser_id = int(data['loser_id'])

    results = ModelResults(tournament_id)
    results.register_win(winner_id, loser_id)

    return ""
