import { EVENTS } from '../../../utils/event.constant';
import { eventBus } from '../../../utils/eventBus';
import { NotificationService } from '../notification.service';


eventBus.on(EVENTS.USER_REGISTERED, async (user: any) => {
    try {
        await NotificationService.sendWelcomeEmail(user.email, user.username);
    } catch (error) {
        console.error(`[Email Listener] Lỗi khi gửi email chào mừng:`, error);
    }
});