import java.awt.*;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import javax.swing.*;

interface AuthMode {
    void sendCode(int code);
    String getName();
}

public class PulseCode extends JFrame {
    private int currentCode;
    private int previousCode;
    private AuthMode currentMode;

    private JLabel currentLabel;
    private JLabel modeLabel;
    private JTextField inputField;
    private JLabel statusLabel;

    public PulseCode(AuthMode defaultMode) {
        this.currentMode = defaultMode;

        setTitle("PulseCode Authenticator");
        setSize(400, 300);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        JPanel displayPanel = new JPanel(new GridLayout(4, 1));
        currentLabel = new JLabel("Current Code: ----", SwingConstants.CENTER);
        modeLabel = new JLabel("Mode: " + currentMode.getName(), SwingConstants.CENTER);
        inputField = new JTextField();
        statusLabel = new JLabel("", SwingConstants.CENTER);

        inputField.setHorizontalAlignment(JTextField.CENTER);
        inputField.addActionListener(e -> validateCode());

        displayPanel.add(currentLabel);
        displayPanel.add(modeLabel);
        displayPanel.add(inputField);
        displayPanel.add(statusLabel);
        add(displayPanel, BorderLayout.CENTER);

        JPanel buttonPanel = new JPanel();
        String[] modes = {"Code", "Email", "SMS"};
        for (String modeName : modes) {
            JButton btn = new JButton(modeName);
            btn.addActionListener(e -> switchMode(modeName));
            buttonPanel.add(btn);
        }
        add(buttonPanel, BorderLayout.SOUTH);

        startCodeRefresher();

        setVisible(true);
    }

    private void switchMode(String name) {
        if (currentMode.getName().equalsIgnoreCase(name)) {
            JOptionPane.showMessageDialog(this, "Already in mode: " + name);
            return;
        }

        currentMode = getModeByName(name);
        modeLabel.setText("Mode: " + currentMode.getName());
        currentMode.sendCode(currentCode);
    }

    private AuthMode getModeByName(String name) {
        switch (name.toLowerCase()) {
            case "email":
                return new AuthMode() {
                    public void sendCode(int code) {
                        System.out.println("[EMAIL] Code: " + code);
                    }
                    public String getName() {
                        return "Email";
                    }
                };
            case "sms":
                return new AuthMode() {
                    public void sendCode(int code) {
                        System.out.println("[SMS] Code: " + code);
                    }
                    public String getName() {
                        return "SMS";
                    }
                };
            default:
                return new AuthMode() {
                    public void sendCode(int code) {
                        System.out.println("[DEFAULT] Code: " + code);
                    }
                    public String getName() {
                        return "Code";
                    }
                };
        }
    }

    private void startCodeRefresher() {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            public void run() {
                previousCode = currentCode;
                currentCode = generateCode();
                SwingUtilities.invokeLater(() -> {
                    currentLabel.setText("Current Code: " + currentCode);
                });
                currentMode.sendCode(currentCode);
            }
        }, 0, 10000);
    }

    private int generateCode() {
        return new Random().nextInt(9000) + 1000;
    }

    private void validateCode() {
        String input = inputField.getText().trim();
        try {
            int enteredCode = Integer.parseInt(input);
            if (enteredCode == currentCode || enteredCode == previousCode) {
                statusLabel.setText("✅ Authenticated");
                statusLabel.setForeground(Color.GREEN);
                Timer resetTimer = new Timer();
                resetTimer.schedule(new TimerTask() {
                    public void run() {
                        SwingUtilities.invokeLater(() -> {
                            inputField.setText("");
                            statusLabel.setText("");
                        });
                    }
                }, 10000);
            } else {
                statusLabel.setText("❌ Invalid Code");
                statusLabel.setForeground(Color.RED);
            }
        } catch (NumberFormatException e) {
            statusLabel.setText("❌ Invalid Input");
            statusLabel.setForeground(Color.RED);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            AuthMode defaultMode = new AuthMode() {
                public void sendCode(int code) {
                    System.out.println("[DEFAULT] Code: " + code);
                }
                public String getName() {
                    return "Code";
                }
            };
            new PulseCode(defaultMode);
        });
    }
}
