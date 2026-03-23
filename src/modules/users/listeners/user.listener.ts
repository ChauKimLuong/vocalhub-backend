import { EVENTS } from '../../../utils/event.constant';
import { eventBus } from '../../../utils/eventBus';
import { userService, UserService } from '../user.service';

eventBus.on(EVENTS.USER_REGISTERED, async (user: any) => {
    try {
        await userService.assignDefaultVocabulary(user.id || user._id);
    } catch (error) {
        console.error(`[User Listener] Lỗi khi cấp bộ từ vựng mặc định:`, error);
    }
});