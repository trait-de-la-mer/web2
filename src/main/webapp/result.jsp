<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="PointsControl.PointsHistory" %>
<%@ page import="PointsControl.Point" %>

<!DOCTYPE html>
<html lang="ru-RU">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="author" content="Васильев Александр Георгиевич">


  <link href="index.css" rel="stylesheet">
  <title>Результаты проверки</title>
</head>

<body>
<table id="mainTable" class="shaded">
  <thead>
  <td colspan="5">
    <h3>Результаты проверки:</h3>
  </td>
  </thead>

  <tbody>
  <tr>
    <td colspan="5"><hr></td>
  </tr>
  </tbody>

  <tfoot>
  <tr>
    <td colspan="5" id="outputContainer">
      <% PointsHistory dao = (PointsHistory) request.getSession().getAttribute("bean");
        if (dao == null) {
      %>
      <h4>
        <span id="notifications" class="outputStub notification">Нет результатов</span>
      </h4>
      <table id="outputTable">
        <tr>
          <th>X</th>
          <th>Y</th>
          <th>R</th>
          <th>Точка входит в ОДЗ</th>
        </tr>
      </table>
      <% } else { %>
      <table id='outputTable'>
        <tr>
          <th>X</th>
          <th>Y</th>
          <th>R</th>
          <th>Точка входит в ОДЗ</th>
        </tr>
        <% for (Point point : dao.getPoints()) { %>
        <tr>
          <td>
            <%= point.getX() %>
          </td>
          <td>
            <%= point.getY() %>
          </td>
          <td>
            <%= point.getR() %>
          </td>
          <td>
            <%= point.isInArea() ? "<span class=\"success\">Попал</span>"
              : "<span class=\"fail\">Промазал</span>" %>
          </td>
        </tr>
        <% } %>
      </table>
      <% } %>
    </td>
  </tr>
  <tr>
    <td>
      <div id="goBack">
        <a href="index.jsp">Вернуться к форме</a>
      </div>
    </td>
  </tr>
  </tfoot>

</table>
<script src="script.js"></script>
</body>

</html>
