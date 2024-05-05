package watcher.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		System.out.println("hollup... let him cook!");
		SpringApplication.run(DemoApplication.class, args);
	}

}
