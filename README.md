## Chatflow

1. Fluxo de chat deve iniciar quando o HandleMessageController receber a solicitação de **CHAT**
2. Usuario deve ser alocado em uma **fila de atendimento**
  * A fila deve ser ordenado por data
3. O atendente disponivel deve poder visualizar a fila e iniciar o atendimento
  * Um atendente só pode iniciar um atendimento, estando na tabela de available e status disponivel
4. O envio de mensagem para usuario deve utilizar o mesmo provider utilizado no HandleMessageController
5.
