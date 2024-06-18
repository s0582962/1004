import java.util.HashMap;

public class Main {

    static class Brett {
        int felderZahl =6*3;
        HashMap<Integer, Boolean> felder = new HashMap<>();
        boolean gameOver = false;
        int count;


        Brett(){
            for (int i = 0; i < felderZahl; i++){
                felder.put(i,false);
            }
        }

        void startGame(){
            count = 0;
            int currentField = 0;
            int nextField = 0;
            felder.put(currentField,true);
            while (gameOver == false){


                int p = diceThrow(); //after pressing a button on the screen
                nextField = currentField+p;
                System.out.println("randomly generated = "+p);
                System.out.println(count+" cf + random = "+currentField+"+"+p+" = "+nextField);

                if (nextField <= felderZahl) {
                    felder.put(currentField, false);
                    felder.put(nextField, true);
                    currentField = nextField;
                }

                if(nextField == felderZahl){
                    System.out.println("You won");
                    gameOver = true;
                }
                if (count == 10){
                    System.out.println("You lost");
                    gameOver = true;
                }count++;
            }
        }

        int diceThrow(){
            return (int)(Math.random() * 6)+1;
        }

    }








    public static void main(String[] args) {

        Brett brett = new Brett();
        brett.startGame();
    }
}