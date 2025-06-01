    <?php
    require_once("../utilities/session.php");
    require_once("../utilities/cors.php");
    require_once("../services/index.php");

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $subjects = getSubjects();
            echo json_encode($subjects);
            exit;

        case 'POST':
            $body = json_decode(file_get_contents("php://input"), true);

            if (!isset($body['subject']['name']) ||  empty($body['subject']['name'])) {
                http_response_code(400);
                echo json_encode([
                    'field' => 'name',
                    'message' => "Este campo es obligatorio"
                ]);
                die();
            }

            $subject = [];
            $subject['name'] = trim($body['subject']['name']);

            $subjects = createSubject($subject);
            echo json_encode($subjects);
            exit;

        case 'PATCH':
            $body = json_decode(file_get_contents("php://input"), true);

            if (!isset($body['subjectName']) || empty($body['subjectName'])) {
                http_response_code(400);
                echo json_encode([
                    'field' => 'name',
                    'message' => "El campo 'name' es obligatorio"
                ]);
                exit;
            }
            if (!isset($body['subjectId']) || empty($body['subjectId'])) {
                http_response_code(400);
                echo json_encode([
                    'field' => 'id',
                    'message' => "El campo 'id' es obligatorio"
                ]);
                exit;
            }

            $subject = [];
            $subject['name'] = trim($body['subjectName']);
            $subject['id'] = $body['subjectId'];

            $subjects = editSubject($subject);
            echo json_encode($subjects);
            exit;

        case 'DELETE':
            $body = json_decode(file_get_contents("php://input"), true);

            // Validar que $body['subjectId'] existe y es un valor válido
            if (!isset($body['subjectId']) || !is_string($body['subjectId']) || empty($body['subjectId'])) {
                http_response_code(400);
                echo json_encode([
                    'field' => 'subjectId',
                    'message' => "Este campo es obligatorio"
                ]);
                die();
            }

            $subjects = deleteSubject($body['subjectId']);
            echo json_encode($subjects);
            exit;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
            exit;
    }
