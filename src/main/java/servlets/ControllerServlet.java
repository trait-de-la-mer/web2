package servlets;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import com.google.gson.Gson;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        processRequest(request, response);
    }


    public void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final var INVALID_DATA_MSG = "bad values";
        try {
            if (request.getParameter("R") == null || request.getParameter("X") == null
                            || request.getParameter("Y") == null)
            {
                sendError(response, INVALID_DATA_MSG);
                return;
            }
            if (request.getParameter("R").isEmpty()
                            || request.getParameter("X").isEmpty()
                            || request.getParameter("Y").isEmpty())
            {
                sendError(response, INVALID_DATA_MSG);
                return;
            }
            BigDecimal y = new BigDecimal(request.getParameter("Y"));
            if (y.compareTo(BigDecimal.valueOf(-5)) < 0
                    || y.compareTo(BigDecimal.valueOf(3)) > 0)
            {
                sendError(response, INVALID_DATA_MSG);
                return;
            }
            Double.parseDouble(request.getParameter("X"));
            Double.parseDouble(request.getParameter("R"));
            response.sendRedirect("./checkArea?" + request.getQueryString());
        } catch (Exception e) {
            sendError(response, e.toString());
        }
    }

    private void sendError(HttpServletResponse response, String errorMessage) throws IOException {
        var json = new Gson();
//        System.out.println("----------------");
        Map<String, Object> jsonResponse = new HashMap<>() {{
            put("error", errorMessage);
            put("status", "UNPROCESSABLE_ENTITY");
        }};
        response.setContentType("application/json");
        response.getWriter().write(json.toJson(jsonResponse));
        System.out.println(json.toJson(jsonResponse));
        response.setStatus(422);
    }
}
