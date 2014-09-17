from tournament_of_lulz.modules.results.model_results import ModelResults


def post(data):
    tournament_id = int(data['tournament'])
    if 'winner_id' not in data:
        raise "No winner_id present"
    if 'loser_id' not in data:
        raise "No loser_id present"

    winner_id = int(data['winner_id'])
    loser_id = int(data['loser_id'])

    results = ModelResults()
    results.register_win(winner_id, loser_id)

    return ""
