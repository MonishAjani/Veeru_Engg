from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def test_cors(request):
    """
    A simple view to test if CORS is working correctly.
    Access this at /api/test-cors/
    """
    return JsonResponse({
        'status': 'success',
        'message': 'CORS is working correctly!',
        'method': request.method,
        'headers': dict(request.headers),
    })